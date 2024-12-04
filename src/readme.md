## Rest countries with theme switch


- In this website i have used rest countries API from which we will get data of some countries and display their data 
and also enable them to view extra details by clicking on the card

 
 ## challenges faced while creating 

 - c1 When someone click on country card then we have to open it on another page which shows their full details of the country so problem is **upon opening of**
  **new page how we will access the data in the new page** so to solve this we will use **localStorage** that when someone clicked on the country container
  we will call a function with passing the clicked country object to that function and that function will set that item to the local storage

      - Then we will access it on the new page


 - And here one might think that if some one click on the country card then it will get saved on the localStorage and we will access it on next page but
   when we will click on the another country it will also get saved.

   Now there are two country object in the local storage so we will have to traverse on the local storage to find that specific value but this will not happen.
   
   Because when we save something to local storage then it get saved in the form of key and value so when we don't retrieve already saved from local storage
   and we try to insert something into local storage then it will overide the already saved value. So in this way we will always get the clicked coutry


- c2 When we are setting eventlistener to some element and wanted to pass some parameter to that callback function then in that case we can't directly pass it to the callback function

 Because it will execute that function immedately so we will write in this way

  ```js

  element.addEventListener('event' ,() => callbackFunction(parameter))

  ```

  - c3 After getting the response from API when i am trying to display it so if there is a content already in that page or container then it will not get displayed so to solve that we will have to write 

  ```js

  container.innerHTML = '';

  ```

  This will flush out already present content present in container

 

 <hr>


  ## I know this website UI is not that much but i don't care much about UI my main goal for this website was functionality which i tried my best to implement