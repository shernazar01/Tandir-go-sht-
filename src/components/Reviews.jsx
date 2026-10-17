function Reviews(){


const reviews=[
{
name:"Ali Valiyev",
text:"Tandir go'shti juda mazali, xizmat ham a'lo.",
},
{
name:"Dilshod Karimov",
text:"Oilamiz bilan keldik, juda yoqdi.",
},
{
name:"Sardor Xasanov",
text:"Jarqo'rg'ondagi eng yaxshi ta'mlardan biri."
}

];


return(

<section className="reviews" id="reviews">


<div className="container">


<div className="section-title">

<span>
FIKRLAR
</span>

<h2>
Mijozlarimiz nima deydi?
</h2>

</div>



<div className="reviews-grid">


{
reviews.map((item,index)=>(

<div className="review-card" key={index}>

<div className="stars">
⭐⭐⭐⭐⭐
</div>


<p>
{item.text}
</p>


<h3>
{item.name}
</h3>


</div>

))
}


</div>


</div>


</section>

)

}


export default Reviews;