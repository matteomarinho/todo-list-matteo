export const Form = (props) =>{
    function Add (){
        var inputValue = document.getElementById("myInput").value;
        var t = document.createTextNode(inputValue);
        if (inputValue === '') {
            alert("You must write something!");
          } else {
            
          }
    }
    return (
    <div>
        <ul id="ul1"></ul>
        
        <p>
            <input type="text" id="myInput" placeholder="Title..."></input>
            <button id="TheAddButton" onClick={Add}>Add</button>
            {props.children}
        </p>
    </div>
    )
}