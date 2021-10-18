const ShowScanned =(props) => {
  return(
    <div className='bg-cl4 h-full'>
      SHOW SCANNED
      <h1>Response from Cloudmersive: {`${props.response}`}</h1>
      <p>Some data from UPC test call: {props.productData.title}</p>

      <button onClick={props.closePrPg}>BACK</button>
    </div>
  )
}

export default ShowScanned
