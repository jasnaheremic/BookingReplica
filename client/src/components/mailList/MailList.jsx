import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Sačuvajte vrijeme i uštedite novac!</h1>
      <span className="mailDesc">Registrirajte se za dnevne popuate!</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Vaš Email" />
        <button>Preplatite se!</button>
      </div>
    </div>
  )
}

export default MailList