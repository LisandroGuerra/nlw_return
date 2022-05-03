
interface ButtonProps {
  text?: string;
}

function Button(props: ButtonProps) {
  return <button>{props.text ?? 'Default'}</button>
}

function App() {

  return (
    <div>
      <Button text="Send" />
      <Button text="Receive" />
      <Button text="Delete" />
      <Button />
    </div>
  )
}

export default App
