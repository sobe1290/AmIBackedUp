import './App.css';
import Header from './components/header';
// import FolderSelector from './components/folderselector';
import FolderComparisonForm from './components/folderomparisonform';

function App() {
  return (
    <div>
      <Header />
      <h1>Folder Comparison</h1>
      <FolderComparisonForm />
    </div>
  );
}

export default App;
