const TitlePage = (props) => {
    return (
        <div className="App-header" onClick={()=>props.clickTitle()}>
            <h2>AFL Footy Results</h2>
        </div>
    )
}

export default TitlePage