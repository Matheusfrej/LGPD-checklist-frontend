import { useNavigate, useParams } from 'react-router-dom'
import { ButtonComponent } from '../../components/ButtonComponent'
import { MainContainer } from '../../templates/MainContainer'
import { SectionContainer } from '../../templates/SectionContainer'
import * as S from './styles'
import { ActionsFooterContainer } from '../../templates/ActionsFooterContainer'
import { useChecklists } from '../../contexts/ChecklistsContext'
import { CheckboxComponent } from '../../components/CheckboxComponent'
import { useEffect, useState } from 'react'
import { AppError } from '../../utils/AppError'
import { useToast } from '../../contexts/ToastContext'
import {
  listDevicesService,
  listDevicesServiceDefaultErrorMessage,
} from '../../services/device/listDevices'
import { DeviceDTO } from '../../dtos/deviceDTO'

export function ChecklistFamilies() {
  const { devices, onSetDevices, fetchItems } = useChecklists()
  const { toastError } = useToast()
  const navigate = useNavigate()
  const { id } = useParams()
  const [allDevices, setAllDevices] = useState<DeviceDTO[]>([])
  const [selectedDeviceIds, setSelectedDeviceIds] = useState<string[]>([])

  const goToMandatoryItems = () => {
    if (id) {
      navigate(`/mandatory-items/${id}`)
    } else {
      navigate('/mandatory-items')
    }
  }

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await listDevicesService()
        setAllDevices(data.devices)
        // If context has devices, set selected IDs
        if (devices && devices.length > 0) {
          setSelectedDeviceIds(devices.map((d) => String(d.id)))
        }
      } catch (error) {
        const isAppError = error instanceof AppError
        const title = isAppError
          ? error.message
          : listDevicesServiceDefaultErrorMessage
        toastError(title)
      }
    }
    fetchDevices()
  }, [devices, toastError])

  const handleDeviceCheckboxChange = (deviceId: number) => {
    const idStr = String(deviceId)
    setSelectedDeviceIds((prev) =>
      prev.includes(idStr)
        ? prev.filter((id) => id !== idStr)
        : [...prev, idStr],
    )
  }

  const handleContinue = async () => {
    const filteredDevices = allDevices.filter((device) =>
      selectedDeviceIds.includes(String(device.id)),
    )
    onSetDevices(filteredDevices)
    if (!id) {
      await fetchItems()
    }
    goToMandatoryItems()
  }

  return (
    <MainContainer>
      <SectionContainer hasHeader>
        <S.ChecklistFamiliesContainer>
          <p>
            Selecione abaixo quais famílias de checklists você quer incluir
            nessa avaliação, além da checklist geral:
          </p>
          <form>
            {allDevices &&
              allDevices.length > 0 &&
              allDevices.map((device) => (
                <CheckboxComponent
                  key={device.id}
                  value={String(device.id)}
                  checked={selectedDeviceIds.includes(String(device.id))}
                  labelText={device.name}
                  onChange={() => handleDeviceCheckboxChange(device.id)}
                />
              ))}
          </form>
        </S.ChecklistFamiliesContainer>
      </SectionContainer>
      <ActionsFooterContainer hasMessage>
        <ButtonComponent text="Voltar" action={() => navigate(-1)} />
        <ButtonComponent text="Continuar" action={handleContinue} />
      </ActionsFooterContainer>
    </MainContainer>
  )
}
