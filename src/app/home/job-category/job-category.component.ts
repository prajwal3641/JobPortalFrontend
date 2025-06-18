import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { companies, jobCategory } from '../../Data/Data';

@Component({
  selector: 'app-job-category',
  imports: [CarouselModule],
  templateUrl: './job-category.component.html',
  styleUrl: './job-category.component.css',
})
export class JobCategoryComponent {
  categories = jobCategory;

  customOptions: OwlOptions = {
    loop: true,
    margin: 24,
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
    nav: true,
    navText: [
      '<div class="absolute opacity-0 group-hover:opacity-100 left-0 md:-left-6 top-1/2 -translate-y-1/2 bg-[#ffd149] text-black text-3xl rounded-full p-2 md:p-3 cursor-pointer shadow-md z-40 hover:bg-yellow-400 transition">&larr;</div>',
      '<div class="absolute opacity-0 group-hover:opacity-100 right-0 md:-right-6 top-1/2 -translate-y-1/2 bg-[#ffd149] text-black text-3xl rounded-full p-2 md:p-3 cursor-pointer shadow-md z-40 hover:bg-yellow-400 transition">&rarr;</div>',
    ],
    responsive: {
      0: { items: 1 },
      640: { items: 2 },
      1024: { items: 3 },
      1280: { items: 4 },
    },
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
  };
}
