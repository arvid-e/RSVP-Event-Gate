import './App.css'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AnswerForm from './components/AnswerForm/AnswerForm';
import AttendeeList from './components/AttendeeList/AttendeeList';


function App() {

  return (
    <>
      <Header/>

      <div className='main'>
        <AnswerForm/>
        <AttendeeList/>
      </div>

      <Footer/>
    </>
  )
}

export default App