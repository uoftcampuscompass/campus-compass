import { Link } from 'react-router-dom';
import appStore from "../assets/images/coming-soon-to-apple.jpeg";
import googlePlay from "../assets/images/coming-soon-to-googleplay.jpeg";

export default function Footer() {
    return(
        <>
            <div className='flex xs:flex-col sm:flex-row justify-between bg-[rgb(7,57,106)] xs:h-[30%] sm:h-[76px] w-[100%] lg:fixed bottom-0 z-10'>
                <div className="flex xs:flex-col sm:flex-row items-center xs:p-8 sm:p-4">
                    <ul className='flex xs:flex-col sm:flex-row xs:space-y-8 sm:space-x-8'>
                        <Link to='#' className="border-b border-gray-400 uppercase">
                            <li className='text-md text-white'>Privacy Policy</li>
                        </Link>

                        <Link to='/delete-profile-instructions' className="border-b border-gray-400 uppercase">
                            <li className='text-md text-white'>Delete Profile Instructions</li>
                        </Link>

                        <Link to='/contact-us' className="border-b border-gray-400 uppercase">
                            <li className='text-md text-white'>Contact Us</li>
                        </Link>
                    </ul>
                </div>
                <div className="flex xs:flex-col sm:flex-row items-center p-4">
                    <ul className='flex xs:flex-col sm:flex-row xs:space-y-8 sm:space-x-8'>
                        <li>
                            <a href="#" target='_blank'>
                                <img src={googlePlay} alt="Coming Soon to the Google Play" className='h-[50px]'/>
                            </a>
                        </li>

                        <li>
                            <a href="#" target='_blank'>
                                <img src={appStore} alt="Coming Soon to the App Store" className='h-[50px]'/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}