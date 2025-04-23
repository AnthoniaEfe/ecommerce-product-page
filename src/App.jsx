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
import { faX, faMinus, faPlus, faBars, faCartShopping, faChevronLeft, faChevronRight, faShoppingCart, faTrashCan} from "@fortawesome/free-solid-svg-icons"
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
    image: "/images/thumb1.jpg",
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
      <nav className='flex flex-row m-0 px-4 py-8 gap-4 justify-between items-center' aria-label="Main navigation">
        <div className='flex flex-row md:flex-row-reverse m-0 gap-4'>
          {isMobile ? <div className='flex flex-column m-0 p-0 justify-center items-center' onClick={() => setIsOpen(!isOpen)}  aria-controls="mobile-menu">
            <FontAwesomeIcon icon={isOpen ? faX : faBars} alt="menu icons" className='h-6 z-100'/>
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
          <FontAwesomeIcon icon={faCartShopping} className='h-8'/>
          <img src={avatarimg} alt="user avatar image" className='h-8'/>
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

      <main className='flex flex-col md:flex-row gap-2 '>
        {isMobile ?
        <div className="w-full overflow-hidden ">
          {/* Slides container */}
          <div
            className="flex transition-transform duration-500 ease-in-out w-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0 flex flex-col p-4 md:p-8 lg:p-10 gap-10 md:gap-12">
                  <img src={image.main} alt='' className='w-full h-full max-h-[60vh] px-6 md:px-20 object-fill object-center '/>
                  <button onClick={prevSlide} className="carousel-button">
                    <FontAwesomeIcon icon={faChevronLeft} className='h-12 mr-5 text-purple-light'/>
                  </button>
                  <button onClick={nextSlide} className="carousel-button text-right" >
                    <FontAwesomeIcon icon={faChevronRight} className='h-12 ml-5 text-purple-light' />
                  </button>
              </div>  ))}
          </div>
        </div> :
        <section className='relative pb-10 p-4 max-w-md mx-auto'>
          {/* Main Image */}
          <img
            src={images[selectedIndex].main}
            alt="Main product"
            className="w-full rounded-2xl cursor-pointer shadow"
            onClick={openLightbox}
          />

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img.thumb}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 rounded-lg cursor-pointer object-cover border-2 ${
                  index === selectedIndex ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>

          {/* Lightbox */}
          <Dialog open={isLightboxOpen} onClose={closeLightbox} className="relative z-50">
            <div className="fixed inset-0 bg-black/80" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="bg-white rounded-xl p-6 max-w-xl w-full relative">
                <button
                  onClick={closeLightbox}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                >
                  <FontAwesomeIcon icon={faX}/>
                </button>

                <img
                  src={images[selectedIndex].main}
                  alt="Lightbox Main"
                  className="w-full rounded-xl mb-4 shadow"
                />

                <div className="flex gap-3 justify-center">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img.thumb}
                      alt={`Lightbox Thumbnail ${index + 1}`}
                      className={`w-16 h-16 rounded-md cursor-pointer object-cover border-2 ${
                        index === selectedIndex ? "border-blue-500" : "border-transparent"
                      }`}
                      onClick={() => setSelectedIndex(index)}
                    />
                  ))}
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        </section>
        } 

        <section className='flex flex-col gap-6 p-[2rem] text-lg text-[rgba(0,0,0,0.75)] pb-10' >
        <div className="p-4 max-w-xl mx-auto space-y-8">
      {/* Quantity Stepper & Add to Cart */}
      <div className="flex items-center gap-4">
        <div className="flex border rounded-xl overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 bg-gray-100 text-xl"
          >
            –
          </button>
          <div className="w-12 flex items-center justify-center text-lg font-semibold">
            {quantity}
          </div>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 bg-gray-100 text-xl"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 shadow"
        >
          Add to Cart
        </button>
      </div>

      {/* Cart Icon + Dropdown */}
      <div className="relative">
        <div
          className="cursor-pointer flex items-center gap-2"
          onClick={() => setShowCart((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faShoppingCart} className="w-6 h-6" />
          {cartItems.length > 0 && (
            <span className="text-sm bg-red-500 text-white rounded-full px-2">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </div>

        {showCart && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border p-4 z-10">
            <h2 className="text-lg font-semibold mb-4">Cart</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <>
                <ul className="space-y-4">
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
                        <FontAwesomeIcon icon={faTrashCan} className="w-5 h-5 text-red-500 hover:text-red-700" />
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => alert("Redirect to checkout")}
                  className="w-full mt-4 bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600"
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
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
          <FontAwesomeIcon icon={faMinus} alt="minus icon" className='h-2'/>
          <p className='font-extrabold text-xl'>0</p>
          <FontAwesomeIcon icon={faPlus} alt="plus icon" className='h-4'/>
        </div>
        
        <button className='flex flex-row justify-center items-center gap-2 shadow-[-10px_20px_20px_20px_rgba(255,110,0,0.2)]
        w-full bg-orange font-extrabold py-4 px-2 m-0 border-2 border-orange rounded-xl'>
          <FontAwesomeIcon icon={faCartShopping} />
        Add to cart
        </button>
        </section>
      </main>
    </div>
  )
}

export default App
