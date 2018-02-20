import { Component,OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Welcome to Books';
  books:any;
  constructor(private _httpService:HttpService){}

  ngOnInit(){
    this.getAllBooks();
  }
  getAllBooks(){
    this._httpService.getBooks().subscribe(data=>{
      this.books=data;
      for(let i =0;i< this.books.length;i++){ 
        if(this.books[i].review.length!==0)
          this.books[i]['star']=this.books[i].review.reduce(function(x,y){ return x.stars+y.stars},0)/this.books[i].review.length;
        else
          this.books[i]['star']=0;
      }
    });
  }
}
