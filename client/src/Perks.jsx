import { CiWifiOn } from "react-icons/ci";
import { PiTelevisionDuotone } from "react-icons/pi";
import { FaCar } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { FaDoorOpen } from "react-icons/fa6";
import { FaRadio } from "react-icons/fa6";

function Perks({selected , onChange}) {
    function handleCbClick(e) {
        const {checked,name} = e.target;
        if (checked) {
        onChange([...selected,name]);
        } else {
        onChange([...selected.filter(selectedName => selectedName !== name)]);
        }
    }
    return(
        <div className="mt-3">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                <label className="inline-flex border p-4 ">
                    <input type="checkbox" checked={selected.includes('wifi')} className="mr-2" name="wifi" onChange={handleCbClick}/>
                    <CiWifiOn className="mr-2 lg:mt-5 md:mt-1"/>
                    <span className="lg:mt-4 ">Wifi</span>
                </label>
                <label className="inline-flex border p-4 ">
                    <input type="checkbox" checked={selected.includes('parking')} className="mr-2" name="parking" onChange={handleCbClick} />
                    <FaCar className="mr-2 lg:mt-5 md:mt-1" />
                    <span className="lg:mt-3 ">Free parking spot</span>
                </label>
                <label className="inline-flex border p-4  ">
                    <input type="checkbox" checked={selected.includes('tv')} className="mr-2" name="tv" onChange={handleCbClick} />
                    <PiTelevisionDuotone className="mr-2 lg:mt-5 md:mt-1" />
                    <span className="lg:mt-4 ">TV</span>
                </label>
                <label className="inline-flex border p-4 ">
                    <input type="checkbox" checked={selected.includes('pets')} className="mr-2" name="pets" onChange={handleCbClick} />
                    <MdPets className="mr-2 lg:mt-5 md:mt-1" />
                    <span className="lg:mt-4 ">Pets</span>
                </label>
                <label className="inline-flex border p-4  ">
                    <input type="checkbox" className="mr-2" checked={selected.includes('entrance')} name="entrance" onChange={handleCbClick}/>
                    <FaDoorOpen className="mr-2 lg:mt-5 md:mt-1" />
                    <span className="lg:mt-3 ">Private Entrance</span>
                </label>
                <label className="inline-flex border p-4  ">
                    <input type="checkbox" checked={selected.includes('radio')} className="mr-2" name="radio" onChange={handleCbClick} />
                    <FaRadio className="mr-2 lg:mt-5 md:mt-1" />
                    <span className="lg:mt-4 ">Radio</span>
                </label>
            </div>
        </div>
    )
}
export default Perks;