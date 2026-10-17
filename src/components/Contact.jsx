import { useState } from "react";


function Contact(){

const [form,setForm] = useState({
  name:"",
  phone:"",
  message:""
});


const sendOrder=(e)=>{

e.preventDefault();


let orders = JSON.parse(
localStorage.getItem("orders")
) || [];


orders.push({
 ...form,
 date:new Date().toLocaleString()
});


localStorage.setItem(
"orders",
JSON.stringify(orders)
);



alert("Buyurtmangiz qabul qilindi!");


setForm({
 name:"",
 phone:"",
 message:""
});


}



return(

<section className="contact" id="contact">


<div className="container">


<div className="section-title">

<span>
ALOQA
</span>

<h2>
Buyurtma berish
</h2>

</div>



<div className="contact-wrapper">



<div className="contact-info">


<div className="contact-box">

<h3>
📍 Manzil
</h3>

<p>
Jarqo'rg'on, Surxondaryo
</p>

</div>


<div className="contact-box">

<h3>
📞 Telefon
</h3>

<p>
+998 90 000 00 00
</p>

</div>


</div>





<form 
className="contact-form"
onSubmit={sendOrder}
>


<input

required

value={form.name}

onChange={(e)=>
setForm({
...form,
name:e.target.value
})
}

placeholder="Ismingiz"
/>



<input

required

value={form.phone}

onChange={(e)=>
setForm({
...form,
phone:e.target.value
})
}

placeholder="Telefon raqamingiz"
/>



<textarea

required

value={form.message}

onChange={(e)=>
setForm({
...form,
message:e.target.value
})
}

placeholder="Qaysi taom kerak?"

></textarea>



<button>
Buyurtma berish
</button>



</form>


</div>


</div>


</section>

)

}


export default Contact;