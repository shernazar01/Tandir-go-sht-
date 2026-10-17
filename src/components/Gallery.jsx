function Gallery(){

const images=[
{
img:"https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
title:"Tandir Go'sht"
},
{
img:"https://images.unsplash.com/photo-1544025162-d76694265947",
title:"Maxsus ta'm"
},
{
img:"https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba",
title:"Milliy taomlar"
},
{
img:"https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
title:"Kabob"
},
{
img:"https://images.unsplash.com/photo-1512058564366-18510be2db19",
title:"Surxon Osh"
},
{
img:"https://images.unsplash.com/photo-1547592180-85f173990554",
title:"Mazali taomlar"
}
];


return(

<section className="gallery" id="gallery">

<div className="container">


<div className="section-title">

<span>
GALEREYA
</span>

<h2>
Bizning taomlarimiz
</h2>

</div>



<div className="gallery-grid">


{
images.map((item,index)=>(

<div className="gallery-item" key={index}>


<img 
src={item.img}
alt={item.title}
/>



<div className="gallery-overlay">

{item.title}

</div>


</div>

))
}



</div>


</div>

</section>

)

}


export default Gallery;