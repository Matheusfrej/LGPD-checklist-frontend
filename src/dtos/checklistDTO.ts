/* eslint-disable @typescript-eslint/no-explicit-any */
export type ChecklistDTO = {
  id: number
  userId: number
  systemId: number
  isGeneral: boolean
  isIot: boolean
  checklistData: any
  createdAt: Date
  updatedAt: Date
}
