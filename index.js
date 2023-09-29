function App(){

    const [quotes,setQuotes] = React.useState([]);
    const [randomQuote,setRandomQuote] = React.useState([]);

    React.useEffect(() => {
        async function fetchData(){
            const response = await fetch("https://type.fit/api/quotes");
            const data = await response.json();

            setQuotes(data);
            let randomIndex = Math.floor(Math.random() * data.length);
            setRandomQuote(data[randomIndex]);
        }
        fetchData();
    },[]);


    return(
        <div>Hello World!

            {quotes.map(quote => (
                <div>{quote.text}</div>
            ))}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));
