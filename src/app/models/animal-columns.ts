type ColumnType = 'text' | 'number' | 'date';

export interface AnimalColumnMeta {
  editable: boolean;
  name: string;
  header: string;
  type?: ColumnType;
}

export const AnimalColumns: AnimalColumnMeta[] = [
  { editable: false, name: 'cowId', header: 'Cow Id' },
  { editable: false, name: 'animalId', header: 'Animal Id' },
  { editable: false, name: 'eventId', header: 'Event Id' },
  { editable: false, name: 'newGroupId', header: 'New Group Id' },
  { editable: false, name: 'currentGroupId', header: 'Current Group Id' },

  // { editable: false, name: 'deletable', header: 'Deletable' },

  { editable: true, name: 'newGroupName', header: 'New Group Name' },
  { editable: true, name: 'currentGroupName', header: 'Current Group Name' },
  { editable: true, name: 'destinationGroup', header: 'Destination Group' },
  {
    editable: true,
    name: 'destinationGroupName',
    header: 'Destination Group Name',
  },

  { editable: true, name: 'ageInDays', header: 'Age In Days', type: 'number' },
  { editable: true, name: 'type', header: 'Type' },
  { editable: true, name: 'alertType', header: 'Alert Type' },
  { editable: true, name: 'cowEntryStatus', header: 'Cow Entry Status' },
  {
    editable: true,
    name: 'birthDateCalculated',
    header: 'Birth Date Calculated',
  },
  {
    editable: true,
    name: 'isOutOfBreedingWindow',
    header: 'Is Out Of Breeding Window',
  },
  {
    editable: true,
    name: 'healthIndex',
    header: 'Health Index',
    type: 'number',
  },
  {
    editable: true,
    name: 'heatIndexPeak',
    header: 'Heat Index Peak',
    type: 'number',
  },

  {
    editable: true,
    name: 'lactationNumber',
    header: 'Lactation Number',
    type: 'number',
  },
  {
    editable: true,
    name: 'oldLactationNumber',
    header: 'Old Lactation Number',
    type: 'number',
  },
  {
    editable: true,
    name: 'daysInLactation',
    header: 'Days In Lactation',
    type: 'number',
  },

  { editable: true, name: 'sire', header: 'Sire', type: 'number' },
  { editable: true, name: 'newborns', header: 'Newborns' },
  { editable: true, name: 'calvingEase', header: 'Calving Ease' },
  {
    editable: true,
    name: 'breedingNumber',
    header: 'Breeding Number',
    type: 'number',
  },
  { editable: true, name: 'interval', header: 'Interval', type: 'number' },
  { editable: true, name: 'duration', header: 'Duration', type: 'number' },
  {
    editable: true,
    name: 'daysInPregnancy',
    header: 'Days In Pregnancy',
    type: 'number',
  },
  { editable: true, name: 'startDateTime', header: 'Start Datetime' },
  {
    editable: true,
    name: 'originalStartDateTime',
    header: 'Original Start Datetime',
    type: 'number',
  },
  {
    editable: true,
    name: 'reportingDateTime',
    header: 'Reporting Datetime',
    type: 'number',
  },
  {
    editable: true,
    name: 'minValueDateTime',
    header: 'Min Value Datetime',
    type: 'number',
  },
  { editable: true, name: 'endDate', header: 'End Date' },
  {
    editable: true,
    name: 'endDateTime',
    header: 'End Datetime',
    type: 'number',
  },
];
