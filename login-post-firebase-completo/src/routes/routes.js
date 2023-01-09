import {BrowserRouter, Routes, Route} from'react-router-dom';

import Home from '../pages/Home/Home'
import Register from '../pages/Register/Register'
import Admin from '../pages/Admin/Admin'
import Private from './Private'


function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route  path='/' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/admin' element={<Private><Admin/></Private>}/>


            </Routes> 
        </BrowserRouter>
    )
}

export default RoutesApp;