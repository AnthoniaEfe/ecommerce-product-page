import './App.css'
import { useState, useEffect } from 'react'
import sneakerslogo from "./assets/images/logo.svg"
import avatarimg from "./assets/images/image-avatar.png"
import productimg1 from "./assets/images/image-product-1.jpg"
import productimg2 from "./assets/images/image-product-2.jpg"
import productimg3 from "./assets/images/image-product-3.jpg"
import productimg4 from "./assets/images/image-product-4.jpg"
import productthumbnail1 from "./assets/images/image-product-1-thumbnail.jpg"
import productthumbnail2 from "./assets/images/image-product-2-thumbnail.jpg"
import productthumbnail3 from "./assets/images/image-product-3-thumbnail.jpg"
import productthumbnail4 from "./assets/images/image-product-4-thumbnail.jpg"
import { faX, faBars, faCartShopping, faChevronLeft, faChevronRight, faShoppingCart, faTrashCan} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "@headlessui/react";

const navItems = ['Collections', 'Men', 'Women', 'About', 'Contact'];
const images = [
  { main: productimg1, thumb: productthumbnail1 },
  { main: productimg2, thumb: productthumbnail2 },
  { main: productimg3, thumb: productthumbnail3 },
  { main: productimg4, thumb: productthumbnail4 }
];

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const handleThumbnailClick = (index) => setSelectedIndex(index);
  const openLightbox = () => setIsLightboxOpen(true);
  const closeLightbox = () => setIsLightboxOpen(false);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const product = {
    id: 1,
    name: "Fall Limited Edition Sneakers",
    price: 125.0,
    image: productthumbnail1,
  };

  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    setQuantity(1);
  };

  const handleDelete = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='font-Kumbh-Sans'>
      <nav className='flex flex-row m-0 p-4 md:px-20 gap-4 justify-between md:justify-around items-center border-b-[1px] border-gray-200' aria-label="Main navigation">
        {/* nav bar */}
        <div className='flex flex-row md:flex-row-reverse m-0 gap-6 md:gap-8 justify-evenly items-center'>
          {isMobile ? <div className='flex flex-column m-0 p-0 justify-center items-center' onClick={() => setIsOpen(!isOpen)}  aria-controls="mobile-menu">
            <FontAwesomeIcon icon={isOpen ? faX : faBars} alt="menu icons" className='h-6 z-100'/>
                </div> : (
                <ul className="flex flex-row m-0 gap-4 justify-center items-center" role="menubar">
                {navItems.map((item) => (
                  <li key={item} role="menuitem" className='cursor-pointer text-gray-500 hover:underline-offset-28 hover:underline
                      hover:decoration-4 hover:decoration-orange'>
                    {item}
                  </li>))}
                </ul>
          )}

           <img src={sneakerslogo} alt="sneakers logo" className='h-4 md:h-6 cursor-pointer'/> 
        </div>

        <div className='flex flex-row m-0 gap-6 md:gap-8 justify-between items-center'>
        {/* Cart Icon */}
          <div className="relative">
            <div
              className="cursor-pointer flex items-center gap-2 "
              onClick={() => setShowCart((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="h-6 md:h-8" />
              {cartItems.length > 0 && (
                <span className="text-xs bg-orange text-white rounded-full px-1 ">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </div>
            {/* dropdown */}
            {showCart && (
              <div className="absolute top-10 -left-70 md:right-50 md:translate-x-100 mt-2 w-[90vw] 
              md:w-80 bg-white rounded-xl shadow-xl border border-white z-10">
                <h2 className="text-lg font-semibold p-4">Cart</h2>
                <hr className='border-gray-300 w-full'></hr>
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 p-10 font-bold text-center">Your cart is empty.</p>
                ) : (
                  <div className='p-4'>
                    <ul className="space-y-4 p-4">
                      {cartItems.map((item) => (
                        <li key={item.id} className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div className="flex-1">
                            <p className="text-sm">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              ${item.price.toFixed(2)} × {item.quantity}{" "}
                              <strong className="text-black">
                                ${item.price * item.quantity}
                              </strong>
                            </p>
                          </div>
                          <button onClick={() => handleDelete(item.id)}>
                            <FontAwesomeIcon icon={faTrashCan} className="w-5 h-5 text-gray-300 hover:text-gray-500" />
                          </button>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => alert("Redirect to checkout")}
                      className="w-full mt-4 font-bold bg-orange py-2 rounded-xl hover:bg-pale-orange transition duration-300"
                    >
                      Checkout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <img src={avatarimg} alt="user avatar image" className='h-10 border-2 border-white hover:border-orange hover:border-2 rounded-full'/>
       </div>

       

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed top-0 right-full translate-x-[100%] w-[100%] h-full  bg-black z-50">
        <div className="fixed top-0 w-[70%] h-full pt-24 bg-white transition-[left] duration-[3000ms] ease-in-out shadow-[2px_0_8px_rgba(0,0,0,0.1)]">
          <ul className="list-none p-[4rem_2rem] flex flex-col gap-[2rem] items-start">
            {navItems.map((item) => (
              <li
                key={item}
             className="text-[1.5rem] font-extrabold cursor-pointer hover:text-orange transition-colors duration-300 ease-in-out"
                role="menuitem"
              >
                {item}
              </li>
            ))}
          </ul> </div> 
          </div>
        )}
      </nav>

      <main className='flex flex-col md:flex-row m-0 p-0 md:px-20 md:py-8 gap-4 md:gap-10 justify-center item-center'>
        {isMobile ?
        <div className="w-full overflow-hidden ">
          {/* carosuel container */}
          <div
            className="flex transition-transform duration-500 ease-in-out w-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0 relative">
                  <img src={image.main} alt='' className='w-full h-full max-h-[60vh] object-fill object-center '/>
                  <button onClick={prevSlide} className=" absolute top-50 left-5 py-1 px-3 bg-white rounded-full hover:text-orange">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <button onClick={nextSlide} className="absolute top-50 right-5 py-1 px-3 bg-white rounded-full hover:text-orange" >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
              </div>  ))}
          </div>
        </div> :
        <section className='relative pb-10 p-4 max-w-md mx-auto flex-1'>
          {/* Main Image */}
          <img
            src={images[selectedIndex].main}
            alt="Main product"
            className="w-full rounded-2xl cursor-pointer shadow"
            onClick={openLightbox}
          />

          {/* Thumbnails */}
          <div className="flex gap-3 justify-around mt-4">
         
            {images.map((img, index) => (
            <div className="relative group w-20 h-20">   
            <img
                key={index}
                src={img.thumb}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 rounded-lg cursor-pointer object-cover border-2 ${
                  index === selectedIndex ? "border-orange" : "border-transparent"
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            <div className="absolute inset-0 bg-white bg-opacity-40 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg" />
            </div>
            ))}
          
          </div>

          {/* Lightbox */}
          <Dialog open={isLightboxOpen} onClose={closeLightbox} className="relative z-50">
            <div className="fixed inset-0 bg-black/80" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center ">
              <Dialog.Panel className="rounded-xl p-6 max-w-xl w-full relative">
                <button
                  onClick={closeLightbox}
                  className="absolute top-3 right-3 font-extrabold text-white hover:text-orange"
                >
                  <FontAwesomeIcon icon={faX}/>
                </button>

                <img
                  src={images[selectedIndex].main}
                  alt="Lightbox Main"
                  className="w-full max-w-[95%] rounded-xl mb-4 shadow"
                />

                <div className="flex gap-3 justify-around ">
                  {images.map((img, index) => (
                    <div className="relative group w-18 h-18">
                    <img
                      key={index}
                      src={img.thumb}
                      alt={`Lightbox Thumbnail ${index + 1}`}
                      className={`w-full h-full rounded-md cursor-pointer object-cover border-2
                        ${index === selectedIndex ? "border-orange" : "border-transparent"}`}
                      onClick={() => setSelectedIndex(index)}
                    />
                    <div className="absolute inset-0 bg-white bg-opacity-40 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg" />
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        </section>
        } 

        <section className='flex flex-col justify-center flex-1 gap-4 p-8 md:p-[2.5rem] text-lg text-[rgba(0,0,0,0.75)] pb-10' >
          <h1 className='uppercase font-semibold'>Sneaker Company</h1>
          <h2 className='font-black text-3xl'>Fall Limited Edition Sneakers</h2> 
          <p className='text-gray-500'>  
            These low-profile sneakers are your perfect casual wear companion. Featuring a 
            durable rubber outer sole, they’ll withstand everything the weather can offer.
          </p>
            <div>
            <div className='flex flex-row gap-2 justify-start items-center'>
              <p className='text-3xl font-extrabold'>$125.00</p>
              <p className='text-xs font-bold text-white bg-black py-1 px-2 border-2 border-black rounded-lg'>50%</p>
            </div> 
          <p className='text-md line-through text-gray-500'>$250.00</p> </div>
          {/* Quantity Stepper & Add to Cart */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="flex justify-between md:justify-center items-center md:w-auto w-full gap-4 py-2 px-4 
            m-0 border-light-grayish-blue bg-light-grayish-blue rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 py-1 text-xl font-extrabold text-orange cursor-pointer"
              >
                –
              </button>
              <div className="w-12 flex items-center justify-center text-lg font-semibold">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 py-1 text-xl font-extrabold text-orange cursor-pointer"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
            className='flex flex-row justify-center items-center gap-2 shadow-pale-orange shadow-xs transition duration-300 grow
            w-full bg-orange hover:bg-pale-orange hover:border-pale-orange font-bold py-2 px-4 m-0 border-2 border-orange rounded-xl'
            >
              <FontAwesomeIcon icon={faCartShopping} className='w-4 mr-2'/>
              Add to Cart
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
