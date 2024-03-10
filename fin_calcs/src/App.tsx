import { Container } from 'reactstrap'
import './App.css'
import Navbar from './components/Navbar'
import React from 'react'
import Image from 'next/image'
import giraffe from "./assets/images/giraffe.jpg"

function App() {
    // const [count, setCount] = useState(0)

    return (
        <Container>
            <Container>
                <Navbar/>
            </Container>
            <Container>
                <Image src={giraffe} alt='giraffe' fill={true}/>
            </Container>
        </Container>
    )
}

export default App
