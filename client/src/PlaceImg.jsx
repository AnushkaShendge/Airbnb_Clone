function PlaceImg ({place , idx=0}) {
    if(!place.photos?.length){
        return ''
    }
    return(
        <img src={'http://localhost:4000/uploads/'+place.photos[idx]} alt="" className="object-cover" />
    )
}
export default PlaceImg