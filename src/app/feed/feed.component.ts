import { Component, OnInit, Input } from '@angular/core';
import { TwitterService } from '../services/twitter.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  providers: [TwitterService]
})
export class FeedComponent implements OnInit {

  tweets;
  currentUser = 'Douglas';
  likedTweet = undefined;
  @Input() newTweet: any = {
    user: '@followmedoug',
    name: 'Douglas Mateus',
    body: '',
    likes: [],
    avatar: '../assets/images/avatar/photo_2018-11-26_12-33-36.jpg'
  }

  constructor(private twitterService: TwitterService) { }

  ngOnInit() {
    this.twitterService.getTweets().subscribe(data => {
      this.tweets = data.json().tweets;
    })
  }

  handleLikedTweetFromChildComponent(tweet) {
    tweet.likes.push(this.currentUser);
    this.twitterService.likeTweet(tweet).subscribe(data => {
    });
  }

  createTweet() {
    this.twitterService.createTweet(this.newTweet).subscribe(data => {
    this.ngOnInit();
    this.newTweet.body = "";
    });
  }

}
