function App() {
    const [quotes, setQuotes] = React.useState([]);
    const [randomQuote, setRandomQuote] = React.useState("");
    const [color, setColor] = React.useState("#34495E");
  
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
  
    const getNewQuote = () => {
      const colors = [
        "#FF5733", "#3498DB", "#E74C3C", "#2ECC71", "#9B59B6", "#F1C40F", "#1ABC9C", "#E67E22", "#34495E", "#27AE60"
      ];
      let randomIndex = Math.floor(Math.random() * quotes.length);
      let randomColorIndex = Math.floor(Math.random() * colors.length);
      setRandomQuote(quotes[randomIndex]);
      setColor(colors[randomColorIndex]);
    }
  
    const tweet = () => {
      const quoteText = encodeURIComponent(`"${randomQuote.text}" - ${author}`);
      const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText}`;
  
      window.open(tweetUrl, '_blank');
    };
  
    return (
      <div className="d-flex flex-column" style={{ backgroundColor: color, minHeight: "100vh" }}>
        <div className="container pt-5 ">
          
            <div className="card col-lg-8 m-auto">
              <div className="card-header">Random Quote</div>
              <div className="card-body">
                {randomQuote ? (
                  <>
                   <div>
                    <h5 className="card-text">&quot;{randomQuote.text}&quot;</h5>
                   </div>
                    
                    <p className="card-title">-{author || "No author"}</p>
                    
                  </>
                ) : (
                  <h2>Loading...</h2>
                )}
  
                <div className="row ">
                  <button onClick={getNewQuote} className="btn btn-primary">New Quote</button>
                  <a
                    href="#"
                    className="btn btn-warning ml-2"
                    onClick={tweet}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-twitter"></i> Tweet
                  </a>
                </div>
              </div>
            </div>
        
        </div>
  
        <footer className="footer mt-auto py-3">
          <div className="container">
            <p className="text-center text-light">Copyright &#169; 2023 Sep Bhashana Chamodya. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    );
  }
  
  ReactDOM.render(<App />, document.getElementById("app"));
  