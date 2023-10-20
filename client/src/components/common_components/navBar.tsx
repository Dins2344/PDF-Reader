import logo from '../../../public/logos/PDF Reader1.png'

const NavBar: React.FC = () => {

    return (
        <div className="w-screen h-auto absolute top-0 flex justify-center py-2">
            <img src={logo} className='w-48 h-[65px]'></img>
        </div>
    )
}

export default NavBar