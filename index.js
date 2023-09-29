function App() {
    const [quotes, setQuotes] = React.useState([]);
    const [randomQuote, setRandomQuote] = React.useState({});
  
    React.useEffect(() => {
      async function fetchData() {
        const response = await fetch("https://type.fit/api/quotes");
        const data = await response.json();
  
        setQuotes(data);
        let randomIndex = Math.floor(Math.random() * data.length);
        setRandomQuote(data[randomIndex]);
      }
      fetchData();
    }, []);
  
    const splitAuthor = (authorString) => {
      const authorParts = authorString.split(','); // Split by comma
      if (authorParts.length >= 2) {
        return {
          author: authorParts[0].trim(),
          source: authorParts[1].trim(),
        };
      } else {
        return {
          author: authorString.trim(),
          source: "Unknown",
        };
      }
    };
  
    const { author, source } = splitAuthor(randomQuote.author || "");

    const getNewQuote = ()=>{
        let randomIndex = Math.floor(Math.random() * quotes.length);
        setRandomQuote(quotes[randomIndex]);
    }
  
    return (
      <div className="container pt-5">
        <div className="jumbotron">
          <div className="card">
            <div className="card-header">Random Quote</div>
            <div className="card-body">
              {randomQuote ? (
                <>
                  <h5 className="card-title">-{author || "No author"}</h5>
                  <p className="card-text">&quot;{randomQuote.text}&quot;</p>
                  
                </>
              ) : (
                <h2>Loading...</h2>
              )}

              <div className="row">
                <button onClick={getNewQuote}>New Quote</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  ReactDOM.render(<App />, document.getElementById("app"));
  