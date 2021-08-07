const btn=document.querySelector("#addbtn");
const updatels=()=>{

    const myallnote =document.querySelectorAll("textarea");
    const date=document.querySelectorAll("h3");

    const notes=[];
    const dates=[];

    myallnote.forEach((e)=>{

        return notes.push(e.value);
    })

    date.forEach((e)=>{

        return dates.push(e.innerHTML);
    })
    

    

    localStorage.setItem('notes',JSON.stringify(notes));
    localStorage.setItem('dates',JSON.stringify(dates));
}

const addnote=(text='',date='')=>{

    const note=document.createElement('div');
    note.classList.add('note');

    const htmldata=`<div class="op"><h3></h3><button class="editbtn"><i class="fas fa-edit"></i></button>
    <button class="deletebtn"><i class="fas fa-trash-alt"></i></button></div><br><br>

    <div class="maindiv ${text?"":"hidden"}"></div>
    <textarea class="${text?"hidden":""}"></textarea>`;

    note.insertAdjacentHTML('afterbegin',htmldata);
    // console.log(note);

    const deletebtn=note.querySelector(".deletebtn");
    const editbtn=note.querySelector(".editbtn");
    const maindiv=note.querySelector(".maindiv");
    const mytext=note.querySelector("textarea");
    const d=note.querySelector("h3");

    maindiv.innerHTML=text;
    mytext.value=text;
    d.innerHTML=date;
    deletebtn.addEventListener('click',()=>{

        note.remove();
        updatels();
    })

    editbtn.addEventListener('click',()=>{

        maindiv.classList.toggle('hidden');
        mytext.classList.toggle('hidden');

    })

    mytext.addEventListener('change',()=>{

        const mynote=mytext.value;
        maindiv.innerHTML=mynote;
        const date=new Date();
        let mydate=date.toLocaleTimeString();
        console.log(date.toLocaleTimeString());
        console.log(date.toDateString());
        d.innerHTML=mydate +" "+ date.toDateString();
        updatels();
    })

    document.body.appendChild(note);
}

const notes=JSON.parse(localStorage.getItem('notes'));
const dates=JSON.parse(localStorage.getItem('dates'));
if(notes){

    //notes.forEach((note)=>addnote(note));
    //dates.forEach((date)=>addnote(date))

    for(i=0;i<notes.length;i++){

        addnote(notes[i],dates[i]);
    }
}

btn.addEventListener('click',()=>addnote());