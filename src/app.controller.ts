import { Body, Controller, Get, Param, Post, Query, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { query, Response, response } from 'express';
import { newAccountDto } from './newAccount.dto';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }


  @Get("mainPage")
  @Render("mainPage")
  getMain(){
    
  }



  #accounts = []
  
  
  
  

  @Get("inputDetails")
  @Render("inputDetailsForm")
  inputDetailsForm(@Query('item') item:string)
  {
        return{
          err: [],
          data: {}
        }
  }


  @Post("inputDetails")
  newInput(@Body() accoundData: newAccountDto, @Res() response: Response)
  {


    let err = [];

    let newAccount = {
      name: accoundData.name,
      billingAddress: accoundData.billingAddress,
      delAddress: accoundData.delAddress,
      cupon: accoundData.cupon,
      cardNum: accoundData.cardNum,
      expDate: accoundData.expDate,
      secCode: accoundData.secCode
    }


    if(!accoundData.name || !accoundData.billingAddress || !accoundData.delAddress || !accoundData.cardNum || !accoundData.cupon || !accoundData.expDate || !accoundData.secCode) {
      err.push("Minden mezőt kötelező megadni!")
    }

    if(!/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(accoundData.cardNum)){
      err.push('A kártyaszám nem megfelelő formátomú!')
    }

    if(!/^\d{2}\d{2}$/.test(accoundData.expDate)){
      err.push('A lejárati dátum nem megfelelő')
    }

    if(err.length > 0)
      {
         response.render('inputDetailsForm', {
          err,
          data: accoundData
 
        })
        return
      }
  


    this.#accounts.push(newAccount)

    response.redirect(303,"paymentSuccess")
    console.log(newAccount.billingAddress)

    
  }


  @Get('paymentSuccess')
  @Render("paymentSuccess")
  newAccountSuccess() {
    return {
      accounts: this.#accounts.length
    }
  }





}
