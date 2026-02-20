import services from "../../../assets/data/services.json";
import ServiceCard from "./ServiceCard";

const ServiceContainer = () => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 text-center">
            <ServiceCard services={services} />
        </section>
    );
};

export default ServiceContainer;