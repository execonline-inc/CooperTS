import { always } from '@kofno/piper';
import * as htmlparser from 'htmlparser2';
import Decoder from 'jsonous';
import { just, Maybe, nothing } from 'maybeasy';
import { fromValue, NonEmptyList } from 'nonempty-list';
import { ok, Result } from 'resulty';

export interface RootNode {
  kind: 'root';
  children: ChildNodes;
}

export interface TextNode {
  kind: 'text';
  text: string;
  parent: ParserNode;
}

export interface TagNode {
  kind: 'tag';
  name: string;
  parent: ParserNode;
  children: ChildNodes;
}

export type ChildNode = TextNode | TagNode;
export type ParserNode = RootNode | ChildNode;
export type ParentNode = RootNode | TagNode;

type ChildNodes = Maybe<NonEmptyList<ChildNode>>;

export default class Parser {
  private readonly input: string;
  private readonly root: Result<string, RootNode> = ok({ kind: 'root', children: nothing() });
  private currentNode: Result<string, ParserNode> = this.root;
  private readonly parser: htmlparser.Parser;

  constructor(input: string) {
    this.input = input;
    this.parser = new htmlparser.Parser(this.handler(this), {
      xmlMode: true,
      decodeEntities: false,
      lowerCaseTags: false,
      lowerCaseAttributeNames: false,
      recognizeCDATA: true,
      recognizeSelfClosing: true,
    });
  }

  private handler = (p: Parser): Partial<htmlparser.DomHandler> => {
    const child = (
      parentNode: Result<string, ParserNode>,
      childNode: ChildNode
    ): Result<string, ChildNode> =>
      parentNode
        .do(node => {
          switch (node.kind) {
            case 'text':
              break;
            case 'root':
            case 'tag':
              node.children = just(
                node.children
                  .map(children => children.concat([childNode]))
                  .getOrElse(() => fromValue(childNode))
              );
          }
        })
        .map(always(childNode));

    return {
      onopentag(name, _) {
        p.currentNode = p.currentNode.andThen(node =>
          child(p.currentNode, {
            kind: 'tag',
            name,
            parent: node,
            children: nothing(),
          })
        );
      },
      onclosetag() {
        p.currentNode.do(node => {
          switch (node.kind) {
            case 'root':
            case 'text':
              break;
            case 'tag':
              p.currentNode = ok(node.parent);
          }
        });
      },
      ontext(text) {
        p.currentNode.do(node => {
          child(p.currentNode, { kind: 'text', text, parent: node });
        });
      },
    };
  };

  public run = (): Result<string, RootNode> => {
    this.parser.write(this.input);
    this.parser.end();
    return this.root;
  };
}

const parse = (input: string): Result<string, RootNode> => {
  return new Parser(input).run();
};

export const translationDecoder = new Decoder<RootNode>(parse);
