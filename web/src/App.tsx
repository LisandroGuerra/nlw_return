function Button(props) {
  return <button>{props.text}</button>
}

function App() {

  return (
    <div>
      <Button text="Enviar" />
      <Button text="Receber" />
      <Button text="Apagar" />
    </div>
  )
}

export default App
