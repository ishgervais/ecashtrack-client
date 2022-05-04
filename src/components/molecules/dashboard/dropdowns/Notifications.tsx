import Heading from '@/components/atoms/custom/Heading'
import DropdownTemplate from './DropdownTemplate'

export default function Notifications() {
    return (
        <DropdownTemplate>
            <div>
                <Heading title="Notifications" capitalize bold />
                <div className="my-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugiat corporis eum quod ratione ut maiores, nesciunt, illum
                    reiciendis, distinctio repudiandae sed quibusdam? Accusamus
                    rerum natus asperiores placeat nemo distinctio quidem.
                </div>
            </div>
        </DropdownTemplate>
    )
}
