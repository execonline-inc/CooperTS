# CooperTS and Associated Libraries:

## The ultimate tool for creating a (relatively) error-themed project.

## CooperTS

### appy

#### types

    MissingApplicationId 1
    AppyError 91 (total 162 - 12 declaration - 59 for import = 91)
    HReferenceable 0

#### functions

    request 2
    callApi 65
    postToApi 13
    putToApi 2
    deleteToApi 5
    getFromApi 0
    getRespFromApi 0

### collections

#### functions

    bifurcateWhen 2
    concat (a lot?)
    concatAll 1
    dropUntil 1
    uniqBy 5
    uniq 3
    find (hard to say)
    findIndex (hard to say. At least twice. How can you differentiate which is being used)
    findR 0
    findItem 1
    findItemT 2
    findPayload 13
    findPayloadT 8
    findPayloadByUuid 3
    groupBy 4
    toPairs 5
    map (hard to say, but a lot. Is there a reason to use the standard map instead of our custom solution?)
    flatMap 4
    mapMaybe 31
    byId 0
    byPayloadId 4
    byPayloadUuid 0
    sort (hard to say, at least 1)
    take 4
    first (hard to say)
    last (hard to say)
    takeLastUntil 0
    takeLastWhile 0

### decoders

#### decoders (temporary formatting)

    eql 3
    stringLiteral (a lot)
    regexDecoder 1
    nullableBlankString 35
    base64Decoder 8
    jsonParserDecoder 8
    pipeD 8
    numberToStringDecoder 44
    stringToNumberDecoder 5
    jsonValueDecoder 1
    secondsDecoder 5
    explicitJust 0
    explicitNothing 0
    explicitMaybe (a lot)
    mergeObjectDecoders 20

### dom

### environment

#### types

    MissingVarError 24
    Production (0? Hard to tell)
    Development (0? Hard to tell)
    Unknown (0? Hard to tell)
    Environment 1?

#### functions

    missingVarError 0
    readVarM 20
    readVarR 5
    readVarT 21
    environment 2?

### logging

#### functions

    logger 0
    warner 13
    log (hard to tell)
    warn (a lot)
    warnAndNotify 23

### maybe-adapter

#### functions

toResult 27
toTask 12
fromBool 15

### numbers

### resource

#### Types

    ResourceCollection 14
    None 8
    Empty 4
    Results 8
    Link (a lot)
    ServerError 17
    Linkable 28
    PossiblyLinkable 7
    Payloaded 0
    Resource (a lot)
    ResourceWithErrors 12
    IdentifiablePayload 4
    ResourceWithMetadata 25
    ValidationError 21
    ValidationErrors (a lot)
    PaginationMetadata 12

#### functions

    none (hard to say)
    empty (hard to say)
    results (hard to say)
    resources 7
    linksDecoder 66
    errorDecoder 0?
    resourceDecoder (a lot)
    resourceWithMetadataDecoder 15
    resourceWithErrorsDecoder 1
    paginationMetadataDecoder 12
    validationErrorDecoder 0
    validationErrorsDecoder 34
    selfUrl 6
    iconUrl 0?
    isNotSelf 0
    resource 34
    payload (hard to say)
    links 57

### time

#### types

    Milliseconds 0
    Seconds 12
    Minutes 3
    Hours 0
    Days 0
    Time 50

#### functions

    milliseconds 1
    seconds (hard to say)
    minutes 6
    hours 0
    days 0
    toMilliseconds 2
    toSeconds 6
    toMinutes 0
    toHours 0
    toDays 0
    toJS 0

### translations

#### types

#### components

AlreadyTranslated 0
L 0
T (a lot)
NotTranslated 0
TranslationsContext 0
TranslationsLoader 0

#### functions

alreadyTranslatedText
defaultSettings 0
initTask 1
localization 0
localizer 0
translation 0
translator 0
translations 0

### urls

#### types

InvalidUrlError 11

#### functions

invalidUrlError 0
toUrlR 0
toUrl 0
toUrlT 5

## Other Stuff to be aware of? (packages, etc)

### festive-possum

#### ajaxian

#### ajaxios

#### cute

#### gaia

#### jsonous

#### maybeasy

#### nonempty-list

#### piper

#### resulty

#### stack-ts

#### taskarian

findLinkByRelAndTypeT 0
