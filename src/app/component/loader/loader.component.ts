import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

    loader: any;

    constructor(
        private cs: CommonService
    ) { 
        this.cs.loader.subscribe(res => {
        console.log("🚀 ~ file: loader.component.ts ~ line 17 ~ LoaderComponent ~ res", res)
            this.loader = res;
        })
    }

    ngOnInit(): void {
    }

}
