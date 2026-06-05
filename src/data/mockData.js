export const accounts = [
  {
    id: '1',
    accountNumber: 'TR330006100519786457841326',
    accountName: 'Vadesiz TL Hesabı',
    balance: 15420.50,
    currency: 'TRY',
    type: 'Vadesiz'
  },
  {
    id: '2',
    accountNumber: 'TR330006100519786457841327',
    accountName: 'Vadeli TL Hesabı',
    balance: 50000.00,
    currency: 'TRY',
    type: 'Vadeli'
  },
  {
    id: '3',
    accountNumber: 'TR330006100519786457841328',
    accountName: 'Döviz Hesabı (USD)',
    balance: 3250.75,
    currency: 'USD',
    type: 'Vadesiz'
  },
  {
    id: '4',
    accountNumber: 'TR330006100519786457841329',
    accountName: 'Döviz Hesabı (EUR)',
    balance: 2100.00,
    currency: 'EUR',
    type: 'Vadesiz'
  }
];

export const transactions = {
  '1': [
    {
      id: 't1',
      accountId: '1',
      date: '2024-06-02T14:30:00',
      description: 'Market Alışverişi',
      amount: -350.00,
      balance: 15420.50,
      type: 'Giden',
      category: 'Alışveriş',
      receiver: 'ABC Market',
      receiptNumber: 'DKT-2024-001'
    },
    {
      id: 't2',
      accountId: '1',
      date: '2024-06-01T10:15:00',
      description: 'Maaş Ödemesi',
      amount: 12000.00,
      balance: 15770.50,
      type: 'Gelen',
      category: 'Maaş',
      sender: 'ABC Şirketi',
      receiptNumber: 'DKT-2024-002'
    },
    {
      id: 't3',
      accountId: '1',
      date: '2024-05-31T16:45:00',
      description: 'Elektrik Faturası',
      amount: -285.30,
      balance: 3770.50,
      type: 'Giden',
      category: 'Fatura',
      receiver: 'Elektrik Dağıtım A.Ş.',
      receiptNumber: 'DKT-2024-003'
    },
    {
      id: 't4',
      accountId: '1',
      date: '2024-05-30T09:20:00',
      description: 'ATM Para Çekimi',
      amount: -500.00,
      balance: 4055.80,
      type: 'Giden',
      category: 'Nakit Çekim',
      receiver: 'ATM - Kadıköy Şubesi',
      receiptNumber: 'DKT-2024-004'
    },
    {
      id: 't5',
      accountId: '1',
      date: '2024-05-29T11:30:00',
      description: 'Online Alışveriş',
      amount: -1250.00,
      balance: 4555.80,
      type: 'Giden',
      category: 'Alışveriş',
      receiver: 'E-Ticaret Sitesi',
      receiptNumber: 'DKT-2024-005'
    }
  ],
  '2': [
    {
      id: 't6',
      accountId: '2',
      date: '2024-05-15T10:00:00',
      description: 'Vadeli Hesap Açılışı',
      amount: 50000.00,
      balance: 50000.00,
      type: 'Gelen',
      category: 'Yatırım',
      sender: 'Hesap Açılışı',
      receiptNumber: 'DKT-2024-006'
    }
  ],
  '3': [
    {
      id: 't7',
      accountId: '3',
      date: '2024-05-28T13:45:00',
      description: 'Döviz Alımı',
      amount: 500.00,
      balance: 3250.75,
      type: 'Gelen',
      category: 'Döviz İşlemi',
      sender: 'TL Hesabından Transfer',
      receiptNumber: 'DKT-2024-007'
    },
    {
      id: 't8',
      accountId: '3',
      date: '2024-05-20T15:30:00',
      description: 'Döviz Alımı',
      amount: 1000.00,
      balance: 2750.75,
      type: 'Gelen',
      category: 'Döviz İşlemi',
      sender: 'TL Hesabından Transfer',
      receiptNumber: 'DKT-2024-008'
    }
  ],
  '4': [
    {
      id: 't9',
      accountId: '4',
      date: '2024-05-25T11:20:00',
      description: 'EUR Alımı',
      amount: 2100.00,
      balance: 2100.00,
      type: 'Gelen',
      category: 'Döviz İşlemi',
      sender: 'TL Hesabından Transfer',
      receiptNumber: 'DKT-2024-009'
    }
  ]
};

export const receipts = {
  'DKT-2024-001': {
    receiptNumber: 'DKT-2024-001',
    transactionId: 't1',
    date: '2024-06-02T14:30:00',
    senderAccount: 'TR330006100519786457841326',
    senderName: 'Ahmet Yılmaz',
    receiverAccount: '1234567890',
    receiverName: 'ABC Market',
    amount: 350.00,
    currency: 'TRY',
    description: 'Market Alışverişi',
    transactionType: 'POS İşlemi',
    status: 'Tamamlandı',
    referenceNumber: 'REF-20240602-143000'
  },
  'DKT-2024-002': {
    receiptNumber: 'DKT-2024-002',
    transactionId: 't2',
    date: '2024-06-01T10:15:00',
    senderAccount: 'TR440006100519786457841999',
    senderName: 'ABC Şirketi',
    receiverAccount: 'TR330006100519786457841326',
    receiverName: 'Ahmet Yılmaz',
    amount: 12000.00,
    currency: 'TRY',
    description: 'Maaş Ödemesi - Mayıs 2024',
    transactionType: 'EFT',
    status: 'Tamamlandı',
    referenceNumber: 'REF-20240601-101500'
  },
  'DKT-2024-003': {
    receiptNumber: 'DKT-2024-003',
    transactionId: 't3',
    date: '2024-05-31T16:45:00',
    senderAccount: 'TR330006100519786457841326',
    senderName: 'Ahmet Yılmaz',
    receiverAccount: 'TR550006100519786457842000',
    receiverName: 'Elektrik Dağıtım A.Ş.',
    amount: 285.30,
    currency: 'TRY',
    description: 'Elektrik Faturası - Mayıs 2024',
    transactionType: 'Fatura Ödemesi',
    status: 'Tamamlandı',
    referenceNumber: 'REF-20240531-164500'
  },
  'DKT-2024-004': {
    receiptNumber: 'DKT-2024-004',
    transactionId: 't4',
    date: '2024-05-30T09:20:00',
    senderAccount: 'TR330006100519786457841326',
    senderName: 'Ahmet Yılmaz',
    receiverAccount: '-',
    receiverName: 'ATM Nakit Çekim',
    amount: 500.00,
    currency: 'TRY',
    description: 'ATM Para Çekimi - Kadıköy Şubesi',
    transactionType: 'ATM İşlemi',
    status: 'Tamamlandı',
    referenceNumber: 'REF-20240530-092000'
  },
  'DKT-2024-005': {
    receiptNumber: 'DKT-2024-005',
    transactionId: 't5',
    date: '2024-05-29T11:30:00',
    senderAccount: 'TR330006100519786457841326',
    senderName: 'Ahmet Yılmaz',
    receiverAccount: '9876543210',
    receiverName: 'E-Ticaret Sitesi',
    amount: 1250.00,
    currency: 'TRY',
    description: 'Online Alışveriş',
    transactionType: 'Sanal POS',
    status: 'Tamamlandı',
    referenceNumber: 'REF-20240529-113000'
  },
  'DKT-2024-006': {
    receiptNumber: 'DKT-2024-006',
    transactionId: 't6',
    date: '2024-05-15T10:00:00',
    senderAccount: '-',
    senderName: 'Hesap Açılışı',
    receiverAccount: 'TR330006100519786457841327',
    receiverName: 'Ahmet Yılmaz',
    amount: 50000.00,
    currency: 'TRY',
    description: 'Vadeli Hesap Açılışı - 6 Ay Vadeli',
    transactionType: 'Hesap İşlemi',
    status: 'Tamamlandı',
    referenceNumber: 'REF-20240515-100000'
  },
  'DKT-2024-007': {
    receiptNumber: 'DKT-2024-007',
    transactionId: 't7',
    date: '2024-05-28T13:45:00',
    senderAccount: 'TR330006100519786457841326',
    senderName: 'Ahmet Yılmaz',
    receiverAccount: 'TR330006100519786457841328',
    receiverName: 'Ahmet Yılmaz',
    amount: 500.00,
    currency: 'USD',
    description: 'Döviz Alımı - USD',
    transactionType: 'Döviz İşlemi',
    status: 'Tamamlandı',
    referenceNumber: 'REF-20240528-134500'
  },
  'DKT-2024-008': {
    receiptNumber: 'DKT-2024-008',
    transactionId: 't8',
    date: '2024-05-20T15:30:00',
    senderAccount: 'TR330006100519786457841326',
    senderName: 'Ahmet Yılmaz',
    receiverAccount: 'TR330006100519786457841328',
    receiverName: 'Ahmet Yılmaz',
    amount: 1000.00,
    currency: 'USD',
    description: 'Döviz Alımı - USD',
    transactionType: 'Döviz İşlemi',
    status: 'Tamamlandı',
    referenceNumber: 'REF-20240520-153000'
  },
  'DKT-2024-009': {
    receiptNumber: 'DKT-2024-009',
    transactionId: 't9',
    date: '2024-05-25T11:20:00',
    senderAccount: 'TR330006100519786457841326',
    senderName: 'Ahmet Yılmaz',
    receiverAccount: 'TR330006100519786457841329',
    receiverName: 'Ahmet Yılmaz',
    amount: 2100.00,
    currency: 'EUR',
    description: 'Döviz Alımı - EUR',
    transactionType: 'Döviz İşlemi',
    status: 'Tamamlandı',
    referenceNumber: 'REF-20240525-112000'
  }
};
