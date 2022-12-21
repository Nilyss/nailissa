import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription, tap } from 'rxjs'
import { Provision } from '../../data/NgRx/models/provision'
import { ProvisionService } from '../../data/services/provision.service'

// NgRx
import { Store, select } from '@ngrx/store'
import { selectProvisionData } from '../../data/NgRx/controller/provision/provisionSelector'
import { ProvisionState } from '../../data/NgRx/controller/provision/provisionReducer'

@Component({
  selector: 'app-home-second-article',
  templateUrl: './home-second-article.component.html',
  styleUrls: ['./home-second-article.component.scss'],
})
export class HomeSecondArticleComponent implements OnInit, OnDestroy {
  isSubscription: Subscription | undefined
  subtitle: string = 'nos prestations'
  title: string = 'prothésiste ongulaire'
  provisions: Provision[]
  provisionId: string
  isModalDisplay: boolean = false

  toggleModal(event: Event, provisionId: string) {
    this.provisionId = provisionId
    this.isModalDisplay = true
    this.modalState = true
  }

  modalState: boolean

  getAllProvision() {
    this.isSubscription = this.store
      .pipe(
        select(selectProvisionData),
        tap((provisions) => (this.provisions = provisions.provision))
      )
      .subscribe()
  }
  constructor(
    private provisionService: ProvisionService,
    private store: Store<{ provisions: ProvisionState }>
  ) {}
  ngOnInit() {
    this.getAllProvision()
  }
  ngOnDestroy() {
    this.isSubscription?.unsubscribe()
  }
}
