let  favoriteCityId = 'Rome';
var lg = console.log;

lg(favoriteCityId);

favoriteCityId = 'Paris';

lg(favoriteCityId);

const citiesId = ["paris", "nyc", "rome", "rio-de-janeiro"];

lg(citiesId);

//citiesId = [];

citiesId.push('tokyo');

lg(citiesId);

function getWeather(cityId){
    let city = cityId.toUpperCase();
    let temperature = 20 ;

    return {city,temperature};
}

const weather = getWeather('paris');

lg(weather);

let {city,temperature} = weather;
lg(city);
lg(temperature);

let [premiereVille,deuxiemeVille, ...resteDesValeurs] = citiesId;
lg(premiereVille);
lg(deuxiemeVille);
lg(resteDesValeurs.length);

class Trip {

    constructor(id,name,imageUrl){
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    set price(newPrice){
        this._price = newPrice;
    }

    get price(){
        return this._price;
    }


    static getDefaultTrip(){
         
        return new Trip('rio-de-janeiro','Rio-de-janeiro','img/rio-de-janeiro.jpg');
    }

    toString(){
        return this.id+', '+this.name+', '+this.imageUrl+", "+this._price;
    }

} 

let parisTrip = new Trip('paris','Paris','img/paris.jpg');

lg(parisTrip);
lg(parisTrip.name);

lg(parisTrip.toString());

parisTrip.price=100;

lg(parisTrip.toString());

let defaultTrip = Trip.getDefaultTrip();

lg(defaultTrip.toString());

class FreeTrip extends Trip {
    
    constructor(id,name,imageUrl){
        super(id,name,imageUrl);
        this._price = 0 ;
    }

    toString(){
        return "Free : " + super.toString();
    }

}

const freeTrip = new FreeTrip('nantes','Nantes','img/nantes.jpg');

lg(freeTrip.toString());

class TripService {

    constructor() {
         this.trips = new Set();
         this.trips.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
         this.trips.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
         this.trips.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));

    }

    findByName(tripName) {

         return new Promise((resolve, reject) => {

             setTimeout( () => {

                const tripTrouve =  Array.from(this.trips).find(t => t.name === tripName);

                 if(tripTrouve) {
                     resolve(tripTrouve)
                 } else {
                     reject('No trip with name '+tripName)
                 }

             }, 2000)
        });
    }
}

class PriceService {

    constructor() {
        this.tripPrices = new Map();

        this.tripPrices.set('paris',100);
        this.tripPrices.set('rio-de-janeiro',800);
        
    }

    findPriceByTripId(tripId) {

       return new Promise((resolve, reject) => {

                    setTimeout( () => {

                        let price=this.tripPrices.get(tripId);

                        if(price){
                            resolve(price)
                        }else{
                            reject("Y'a pas de prix pour la ville de "+tripId)
                        }
                       

                    }, 2000)
               });
    }
}

let tripService = new TripService();
let priceService = new PriceService();

let tripTrouve = tripService.findByName('toulouse');
tripTrouve.then(trip => {
    lg(trip.imageUrl)
})
.catch(err => {
     lg(err)   
})

let priceTrouve = priceService.findPriceByTripId('rio-de-janeiro');

priceTrouve.then(price=>{
    lg("Price found = "+price)
})
.catch(err => {
    lg(err)   
})