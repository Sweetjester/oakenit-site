/**
 * Statutory company details.
 *
 * A UK limited company must disclose its registered name, registered number,
 * place of registration and registered office address on its website — see the
 * Company, Limited Liability Partnership and Business (Names and Trading
 * Disclosures) Regulations 2015. These are taken from the public register.
 *
 * NOTE: the registered office is currently a residential address. If Andy moves
 * to a registered-office service, change it here and it updates everywhere.
 */
export const COMPANY = {
  legalName: 'Oaken IT Ltd',
  tradingName: 'OakenIT',
  number: '17329880',
  placeOfRegistration: 'England and Wales',
  registeredOffice: 'Flat 133 Uncle Apartments, 3 Park Lane, Wembley, England, HA9 7FG',
  email: 'hello@oakenit.com',
  /** Set once VAT registered; the number must be shown if so. */
  vatNumber: null as string | null,
};

/** IndexNow key — the matching file is public/<key>.txt, which must stay. */
export const INDEXNOW_KEY = 'bf14b2ee3fbf8c2f4c93edf2fa30cb1f';
