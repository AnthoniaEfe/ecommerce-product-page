import './App.css'
import { useState, useEffect } from 'react'
import sneakerslogo from "./assets/images/logo.svg"
import menuopenicon from "./assets/images/icon-menu.svg"
import menucloseicon from "./assets/images/icon-close.svg"
import carticon from "./assets/images/icon-cart.svg"
import avatarimg from "./assets/images/image-avatar.png"
import productimg1 from "./assets/images/image-product-1.jpg"
import productimg2 from "./assets/images/image-product-2.jpg"
import productimg3 from "./assets/images/image-product-3.jpg"
import productimg4 from "./assets/images/image-product-4.jpg"
import productthumbnail1 from "./assets/images/image-product-1-thumbnail.jpg"
import productthumbnail2 from "./assets/images/image-product-2-thumbnail.jpg"
import productthumbnail3 from "./assets/images/image-product-3-thumbnail.jpg"
import productthumbnail4 from "./assets/images/image-product-4-thumbnail.jpg"
import nexticon from "./assets/images/icon-next.svg"
import previousicon from "./assets/images/icon-previous.svg"
import minusicon from "./assets/images/icon-minus.svg"
import plusicon from "./assets/images/icon-plus.svg"

// --spacing =0.5rem
// const product = {
//   title: "Fall Limited Edition Sneakers",
//   description:
//     "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
//   price: 125,
//   originalPrice: 250,
//   discount: 50,
//   images: [
//     productimg1, productimg2, productimg3, productimg4
//   ],
// };

  const navItems = ['Collections', 'Men', 'Women', 'About', 'Contact'];
  const productImages = [productimg1, productimg2, productimg3, productimg4];
  const productThumbails = [productthumbnail1, productthumbnail2, productthumbnail3, productthumbnail4];

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='font-Kumbh-Sans'>
      <nav className='flex flex-row m-0 px-4 py-8 gap-4 justify-between items-center' aria-label="Main navigation">
        <div className='flex flex-row md:flex-row-reverse m-0 gap-4'>
          {isMobile ? <div className='flex flex-column m-0 p-0 justify-center items-center' onClick={() => setIsOpen(!isOpen)}  aria-controls="mobile-menu">
                {isOpen ? (<img src={menucloseicon} alt="menu close icon" className='h-6 z-10'/>) : ( <img src={menuopenicon} alt="menu open icon" className='h-6'/>)}
                </div> : (
                <ul className="flex flex-row m-0 gap-4 justify-center items-center" role="menubar">
                {navItems.map((item) => (
                  <li key={item} role="menuitem">
                    {item}
                  </li>))}
                </ul>
          )}

           <img src={sneakerslogo} alt="sneakers logo" className='flex flex-column m-0 p-0 justify-center items-center h-8 md:h-10'/> 
        </div>

        <div className='flex flex-row m-0 gap-4'>
          <img src={carticon} alt="cart icon" className='h-8'/>
          <img src={avatarimg} alt="user avatar image" className='h-8'/>
       </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed top-0 right-full translate-x-[100%] w-[100%] h-full  bg-[rgba(0,0,0,0.75)]">
        <div className="fixed top-0 w-[70%] h-full pt-24 bg-white transition-[left] duration-[3000ms] ease-in-out shadow-[2px_0_8px_rgba(0,0,0,0.1)]">
          <ul className="list-none p-[4rem_2rem] flex flex-col gap-[2rem] items-start">
            {navItems.map((item) => (
              <li
                key={item}
             className="text-[1.5rem] font-extrabold cursor-pointer hover:text-[#ff6e00] transition-colors duration-300 ease-in-out"
                role="menuitem"
              >
                {item}
              </li>
            ))}
          </ul> </div> 
          </div>
        )}
      </nav>

<main className='flex flex-col md:flex-row gap-2 '>
    <section className='relative pb-10'>
      <div>
      {productImages.map(
        (item, index)=>(
        <img key={index} src={item} className=' max-h-[40%]'/> 
    ))}

    <button className='absolute z-2 h-8 top-[10%] right-[95%] translate-x-[100%] p-2 bg-white border-white border-2 rounded-full'>
    <img src={previousicon} alt="previous icon" />    
    </button>

    <button className='absolute z-2 h-8 top-[10%] left-[95%] translate-x-[-100%] p-2 bg-white border-white border-2 rounded-full'>
    <img src={nexticon} alt="next icon" />    
    </button>
       </div>

      <div className='hidden md:block'>
      {productThumbails.map(
        (item, index)=>(
        <img key={index} src={item}/> 
    ))}
      </div>
    </section>

    <section className='flex flex-col gap-6 p-[2rem] text-lg text-[rgba(0,0,0,0.75)]' pb-10>
      <h1 className='uppercase font-semibold'>Sneaker Company</h1>
      <h2 className='font-black text-4xl'>Fall Limited Edition Sneakers</h2> 
    <p>  These low-profile sneakers are your perfect casual wear companion. Featuring a 
      durable rubber outer sole, they’ll withstand everything the weather can offer.
    </p>
  

    <div className='flex flex-row gap-[1rem] justify-between items-center w-full px-2 py-4 m-0'>
    <div className='flex flex-row gap-2 justify-start items-center'>
      <p className='text-4xl font-extrabold'>$125.00</p>
      <p className='text-xl text-white bg-black py-1 px-2 border-2 border-black rounded-lg'>50%</p>
      </div> 
     
     <p className='text-2xl line-through'>$250.00</p> 
    </div>
 

    <div className='flex flex-row gap-[1rem] justify-around items-center w-full px-2 py-4 m-0 bg-gray-100 border-2 border-gray-100 rounded-xl'>
      <img src={minusicon} alt="minus icon" className='h-2'/>
      <p className='font-extrabold text-xl'>0</p>
      <img src={plusicon} alt="plus icon" className='h-4'/>
    </div>
    
    <button className='flex flex-row justify-center items-center gap-2 shadow-[-10px_20px_20px_20px_rgba(255,110,0,0.2)]
    w-full bg-[#ff6e00] font-extrabold py-4 px-2 m-0 border-2 border-[#ff6e00] rounded-xl'>
      <img src={carticon} alt="cart icon"/>
     Add to cart
    </button>
    </section>
  </main>
    </div>
  )
}

export default App
