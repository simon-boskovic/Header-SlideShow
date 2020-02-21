import {HeaderTilesDto} from '../dtos/header-tiles-dto';
export class HeaderSettingsDto {
    public SizeID: string;
    public AnimationTypeID: string;
    public AnimationDurationID: string;
    public HeaderTiles: HeaderTilesDto[] = [];
}
