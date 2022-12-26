import MainApp from './MainApp';
import toasty from 'toasty';
import useKonami from 'use-konami';

const MyComponent = () => {
  useKonami({onUnlock: () => toasty().trigger()});
  return (
    <div>
      <MainApp />
    </div>
  );
}

export default MyComponent;