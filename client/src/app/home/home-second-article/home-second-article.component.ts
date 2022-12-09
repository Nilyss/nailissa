import { Component, OnInit, OnDestroy } from '@angular/core'
import { ProvisionService } from '../provision.service'
import { Subscription } from 'rxjs'
import { Provision } from '../provision'

@Component({
  selector: 'app-home-second-article',
  templateUrl: './home-second-article.component.html',
  styleUrls: ['./home-second-article.component.scss'],
})
export class HomeSecondArticleComponent implements OnInit, OnDestroy {
  isSubscription: Subscription | undefined
  subtitle: string = 'nos prestations'
  title: string = 'prothésiste ongulaire'
  provisionsData: Provision[]
  provisionId: string
  isModalDisplay: boolean = false

  toggleModal(event: Event, provisionId: string) {
    this.provisionId = provisionId
    this.isModalDisplay = true
    this.modalState = true
  }

  modalState: boolean

  getAllProvision() {
    this.isSubscription = this.provService
      .getAllProvision()
      .subscribe((res) => {
        this.provisionsData = res
      })
  }
  constructor(private provService: ProvisionService) {}
  ngOnInit() {
    this.getAllProvision()
  }
  ngOnDestroy() {
    this.isSubscription?.unsubscribe()
  }
}
