import { useEffect, useState } from "react";
import { getAllJobs, searchExternalJobs } from "../services/jobService";
import { getMyProfile, toggleJobSave } from "../services/userService";

export function useJobs(user, setUser) {
  const [jobs, setJobs] = useState([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const savedJobIds = user?.savedJobs?.map((j) => j.id || j.externalId) || [];

  useEffect(() => {
    const load = async () => {
      setIsLoadingJobs(true);
      const data = await getAllJobs();
      setJobs(data);
      setIsLoadingJobs(false);
    };
    load();
  }, []);

  const searchJobs = async (term) => {
    setIsLoadingJobs(true);
    if (!term.trim()) {
      const data = await getAllJobs();
      setJobs(data);
    } else {
      setJobs([]);
      const external = await searchExternalJobs(term);
      setJobs(external);
    }
    setIsLoadingJobs(false);
  };

  const toggleSave = async (jobId) => {
    const jobToSave =
      jobs.find((j) => j.id === jobId || j.externalId === jobId) ||
      user.savedJobs?.find((j) => j.id === jobId || j.externalId === jobId);

    if (!jobToSave || !user) return;

    // Actualización visual
    const currentSaved = user.savedJobs || [];
    const isAlreadySaved = currentSaved.some(
      (j) => j.id === jobId || j.externalId === jobId
    );

    let newSavedJobs;
    if (isAlreadySaved) {
      newSavedJobs = currentSaved.filter(
        (j) => j.id !== jobId && j.externalId !== jobId
      );
    } else {
      newSavedJobs = [...currentSaved, jobToSave];
    }

    // Actualizar usuario global
    setUser({ ...user, savedJobs: newSavedJobs });

    // Llamada al Back
    await toggleJobSave(user.id, jobToSave);

    // Sincronización Final
    const updatedUser = await getMyProfile(user.id);
    setUser(updatedUser);
  };

  return { jobs, savedJobIds, isLoadingJobs, searchJobs, toggleSave };
}
