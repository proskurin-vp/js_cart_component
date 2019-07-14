/* Скрипт компонента корзины */

var Cart = function(){

    // private section
    var options = {}; // этот объект хранит различные используемые корзиной свойства
    // такие как:
    // - массив тегов, клик по которым добавляет в корзину товар
    // - тег, в котором показывается всплывающее сообщение
    // - тег, клик по которому показывает корзину

    // Функция добавления товара в корзину
    var addToCart = function (e){                   
        this.disabled = true; // блокировка элемента на время выполнения функции
        var cartData = getCartData() || {}; // получаем данные корзины, если она есть или создаём новый объект
        var id = this.dataset.id;
        var name = this.dataset.name; // используется для 
        var price = this.dataset.price; // извлечения пользовательских
        var img = this.dataset.img;   // атрибутов
       
        // идея объекта-корзины:
        // это массив с ключами - идентификаторами товаров
        // каждый элемент такого массива - это массив с изображением,
        // названием, ценой и количеством

        if(cartData.hasOwnProperty(id)){ // если такой товар
        // присутствует в корзине, то увеличиваем количество
            cartData[id][3]++;
        }
        else{
            cartData[id] = [img, name, price, 1];
        }

        setCartData(cartData); // обновляем данные в локальном хранилище

        setMessage(options.tagForMessage, 'Товар ' + name + ' добавлен  в корзину');
        this.disabled = false;
    };
    
    //Функция записи данных в localStorage
    var setCartData = function (obj){
        localStorage.setItem('cart', JSON.stringify(obj));
    };

    //Функция получения данных из localStorage
    var getCartData = function (){
        return JSON.parse(localStorage.getItem('cart'));
    };

    var openCart = function (e){
        var cartData = getCartData(); // получили данные объекта-корзины
        var totalItems = ''; // переменная для формирования содежимого тега table
        var totalSum = 0;   
        document.getElementById('modal-gray-layer').style.display='inline-block';
        var tableCart = document.getElementById('table-cart');                
        if(cartData !==null){
            for(var item in cartData){
                totalItems+="<tr><td><img src='" + cartData[item][0] + "' width='60px' alt='' /></td>";
                for(var i=1; i<cartData[item].length; i++){
                    totalItems+='<td>' + cartData[item][i] + '</td>';
                }
                totalSum += cartData[item][2]*cartData[item][3]; // подсчёт общей суммы
                totalItems += "<td><span class='del-item' data-id='" + item +
                "' onclick='Cart.delItem(" + item + "); return false;'>&#10006;</span></td></tr>";
            }
            totalItems+="<tr><td></td><td><strong>Итого</strong></td><td><strong>" + totalSum 
            + " грн</strong></td><td></td><td></td><td></td></tr>";
            tableCart.innerHTML = totalItems;
        }
        else{
            tableCart.innerHTML = '<tr><td>Ничего нет (</td></tr>';
        }
    };

    var remomeCart = function (){
        localStorage.removeItem('cart');
        setMessage(options.tagForMessage, 'Корзина очищена');
    };

    // public section
    return{
        init: function(opts){
            options.buttonsAddToCart = opts.buttonsAddToCart;
            options.tagForMessage = opts.tagForMessage;
            options.tagCheckoutCart = opts.tagCheckoutCart;

            //Установили обработчик события клика на каждый элемент для добавления
            //товара в корзину
            for(var i=0; i<options.buttonsAddToCart.length; i++){               
                addEvent(options.buttonsAddToCart[i], 'click', addToCart);
            }

            addEvent(document.querySelector('.modal-close'), 'click', function(){
                document.getElementById('modal-gray-layer').style.display ='none';
            });

            addEvent(options.tagCheckoutCart, 'click', openCart);
        },
        
         // Функция удаления товара из объекта-корзины 
        delItem: function (item){
            var cartData = getCartData();
            if(cartData.hasOwnProperty(item)){
                delete cartData[item]; // оператор delete удаляет свойство из объекта
                setCartData(cartData); // перезаписываем изменённые данные в localstorage
                if(isEmpty(cartData) == true){ // если объект-корзина пустая
                    remomeCart(); // удаление корзины из localstorage
                    document.getElementById('table-cart').innerHTML = '<tr><td>Ничего нет (</td></tr>';
                }
                else{
                    openCart(); // показываем корзину
                }
            }        

        }
    };
}();

