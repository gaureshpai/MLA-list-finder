import './Loader.css'

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="card">
        <div className="loader">
          <p>loading</p>
          <div className="words">
            <span className="word">Data</span>
            <span className="word">Cards</span>
            <span className="word">Buttons</span>
            <span className="word">Text</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;