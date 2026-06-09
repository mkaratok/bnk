export const accounts = [
  {
    id: '1',
    accountNumber: '146551008 CEPTETEB',
    accountName: 'Vadesiz TL',
    balance: 0.00,
    currency: 'TRY',
    type: 'Vadesiz',
    iban: 'TR38 0003 2000 0000 0146 5510 08',
    branch: 'CEPTETEB',
    ownerName: 'UĞUR AYHAN',
    openDate: '17/11/2025',
    cardLastFour: '9352'
  }
];

export const cards = [
  {
    id: 'c1',
    cardName: 'BANKA KARTI',
    cardNumber: '5352 17** **** 9352',
    balance: 0.00,
    currency: 'TRY',
    type: 'Banka Kartı'
  }
];

export const transactions = {
  '1': [
    {
      id: 't1',
      accountId: '1',
      date: '2026-06-05T04:22:00',
      description: 'YAPI VE KREDİ BANKASI A.Ş.',
      amount: -4000.00,
      balance: 0.00,
      type: 'Giden',
      category: 'EFT/Havale',
      receiver: 'YAPI VE KREDİ BANKASI A.Ş.',
      receiptNumber: 'DKT-2026-001'
    },
    {
      id: 't2',
      accountId: '1',
      date: '2026-06-05T04:20:00',
      description: 'MURAT ÇAKMAK den gelen havale tutarı',
      amount: 4000.00,
      balance: 4000.00,
      type: 'Gelen',
      category: 'Havale',
      sender: 'MURAT ÇAKMAK',
      receiptNumber: 'DKT-2026-002'
    },
    {
      id: 't3',
      accountId: '1',
      date: '2026-06-04T19:39:00',
      description: 'YAPI VE KREDİ BANKASI A.Ş.',
      amount: -2000.00,
      balance: 0.00,
      type: 'Giden',
      category: 'EFT/Havale',
      receiver: 'YAPI VE KREDİ BANKASI A.Ş.',
      receiptNumber: 'DKT-2026-003'
    },
    {
      id: 't4',
      accountId: '1',
      date: '2026-06-04T19:38:00',
      description: 'MURAT ÇAKMAK den gelen havale tutarı',
      amount: 2000.00,
      balance: 2000.00,
      type: 'Gelen',
      category: 'Havale',
      sender: 'MURAT ÇAKMAK',
      receiptNumber: 'DKT-2026-004'
    },
    {
      id: 't5',
      accountId: '1',
      date: '2026-06-04T02:19:00',
      description: 'YAPI VE KREDİ BANKASI A.Ş.',
      amount: -1000.00,
      balance: 0.00,
      type: 'Giden',
      category: 'EFT/Havale',
      receiver: 'YAPI VE KREDİ BANKASI A.Ş.',
      receiptNumber: 'DKT-2026-005'
    }
  ]
};

export const receipts = {
  'DKT-2026-001': {
    receiptNumber: 'DKT-2026-001',
    transactionId: 't1',
    date: '2026-06-05T04:22:00',
    senderAccount: 'TR38 0003 2000 0000 0146 5510 08',
    senderName: 'UĞUR AYHAN',
    receiverAccount: 'TR12 0006 7010 0000 0012 3456 78',
    receiverName: 'MURAT ÇAKMAK',
    amount: 4000.00,
    currency: 'TRY',
    description: 'Bireysel Ödeme',
    transactionType: 'FAST EFT',
    status: 'Tamamlandı',
    referenceNumber: '00125009',
    authCode: 'T99148',
    terminalId: '-',
    balanceAfter: 0.00
  },
  'DKT-2026-002': {
    receiptNumber: 'DKT-2026-002',
    transactionId: 't2',
    date: '2026-06-05T04:20:00',
    senderAccount: 'TR12 0006 7010 0000 0012 3456 78',
    senderName: 'MURAT ÇAKMAK',
    receiverAccount: 'TR38 0003 2000 0000 0146 5510 08',
    receiverName: 'UĞUR AYHAN',
    amount: 4000.00,
    currency: 'TRY',
    description: 'Havale',
    transactionType: 'FAST EFT',
    status: 'Tamamlandı',
    referenceNumber: '00125010',
    authCode: 'T99149',
    terminalId: '-',
    balanceAfter: 4000.00
  },
  'DKT-2026-003': {
    receiptNumber: 'DKT-2026-003',
    transactionId: 't3',
    date: '2026-06-04T19:39:00',
    senderAccount: 'TR38 0003 2000 0000 0146 5510 08',
    senderName: 'UĞUR AYHAN',
    receiverAccount: 'TR12 0006 7010 0000 0012 3456 78',
    receiverName: 'MURAT ÇAKMAK',
    amount: 2000.00,
    currency: 'TRY',
    description: 'Bireysel Ödeme',
    transactionType: 'FAST EFT',
    status: 'Tamamlandı',
    referenceNumber: '00125011',
    authCode: 'T99150',
    terminalId: '-',
    balanceAfter: 0.00
  },
  'DKT-2026-004': {
    receiptNumber: 'DKT-2026-004',
    transactionId: 't4',
    date: '2026-06-04T19:38:00',
    senderAccount: 'TR12 0006 7010 0000 0012 3456 78',
    senderName: 'MURAT ÇAKMAK',
    receiverAccount: 'TR38 0003 2000 0000 0146 5510 08',
    receiverName: 'UĞUR AYHAN',
    amount: 2000.00,
    currency: 'TRY',
    description: 'Havale',
    transactionType: 'FAST EFT',
    status: 'Tamamlandı',
    referenceNumber: '00125012',
    authCode: 'T99151',
    terminalId: '-',
    balanceAfter: 2000.00
  },
  'DKT-2026-005': {
    receiptNumber: 'DKT-2026-005',
    transactionId: 't5',
    date: '2026-06-04T02:19:00',
    senderAccount: 'TR38 0003 2000 0000 0146 5510 08',
    senderName: 'UĞUR AYHAN',
    receiverAccount: 'TR12 0006 7010 0000 0012 3456 78',
    receiverName: 'MURAT ÇAKMAK',
    amount: 1000.00,
    currency: 'TRY',
    description: 'Bireysel Ödeme',
    transactionType: 'FAST EFT',
    status: 'Tamamlandı',
    referenceNumber: '00125013',
    authCode: 'T99152',
    terminalId: '-',
    balanceAfter: 0.00
  }
};
