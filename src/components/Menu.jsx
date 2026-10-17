function Menu(){

const foods = [
  {
    name:"Tandir Go'sht",
    desc:"Yumshoq va shirali qo'y go'shti",
    price:"120 000 so'm",
    img:"https://images.unsplash.com/photo-1544025162-d76694265947"
  },

  {
    name:"Kabob",
    desc:"Ko'mirda pishirilgan mazali kabob",
    price:"80 000 so'm",
    img:"https://images.unsplash.com/photo-1529193591184-b1d58069ecdd"
  },

  {
    name:"Surxon Osh",
    desc:"Milliy usulda tayyorlangan palov",
    price:"50 000 so'm",
    img:"https://images.unsplash.com/photo-1512058564366-18510be2db19"
  }

];


return(

<section className="menu" id="menu">

<div className="container">


<div className="section-title">

<span>
MENYU
</span>

<h2>
Mazali taomlarimiz
</h2>

<p>
Haqiqiy milliy ta'm
</p>

</div>



<div className="menu-grid">


{
foods.map((food,index)=>(

<div className="menu-card" key={index}>


<img src={food.img} alt={food.name}/>


<div className="menu-info">

<h3>
{food.name}
</h3>


<p>
{food.desc}
</p>


<strong>
{food.price}
</strong>


<a href="#contact">
<button>
Buyurtma
</button>
</a>


</div>


</div>

))
}



</div>


</div>


</section>

)

}


export default Menu;