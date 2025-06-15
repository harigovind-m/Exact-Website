/* import { motion } from "framer-motion";

export default function TeamMember({ member, delay }) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <img 
        src={member.image} 
        alt={member.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
        <p className="text-red-600 mb-3">{member.role}</p>
        <p className="text-gray-600">{member.bio}</p>
      </div>
    </motion.div>
  );
} */