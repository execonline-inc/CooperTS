import { NextPage } from 'next';

const Examples: NextPage = () => (
  <>
    <h1>Examples</h1>
    <div className="example">
      <h2>Task Manager App</h2>
      <iframe
        src="https://codesandbox.io/embed/dawn-cookies-yhsxo9?fontsize=14&hidenavigation=1&theme=dark"
        style={{
          width: '100%',
          height: '500px',
          border: '0',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
        title="dawn-cookies-yhsxo9"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </div>
  </>
);

export default Examples;
