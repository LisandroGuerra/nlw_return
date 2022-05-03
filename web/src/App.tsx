
interface ButtonProps {
  text?: string;
}

function Button(props: ButtonProps) {
  return <button
    className="bg-orange-600 text-orange-100 
    p-2 rounded px-4 h-10
    hover:bg-orange-700 transition-colors">{props.text ?? 'Default'}</button>
}

function App() {

  return (
    <div className="flex gap-2">
      <Button text="Send" />
      <Button text="Receive" />
      <Button text="Delete" />
      <Button />
    </div>
  )
}

export default App
