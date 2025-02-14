import './App.css'
import List from './Components/List'
import Reproduccion from './Components/Reproduccion'

function App() {



  
  return (
    <div className='h-[100vh]'>
      <img src="./imagenes/Kevinmusic(1).png" alt="" className='mt-10'/>  
      <div className='flex justify-between items-center h-auto mt-20'>
        <List/>
        <Reproduccion/>
      </div>
    </div>
  )
}

export default App
