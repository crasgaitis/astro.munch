def process_simulation_params(params):
    """
    Validate and process galaxy parameters.
    """
    try:
        if not isinstance(params, list):
            raise ValueError("Input must be a list of galaxy parameter dictionaries.")

        processed_params = []
        for galaxy in params:
            required_keys = ["name", "position", "velocity", "mass", "radius", "type"]
            for key in required_keys:
                if key not in galaxy or galaxy[key] is None:
                    raise ValueError(f"Missing required parameter: '{key}' in galaxy '{galaxy.get('name', 'Unknown')}'")

            position = galaxy["position"]
            velocity = galaxy["velocity"]
            if not (isinstance(position, list) and len(position) == 3 and all(isinstance(p, (int, float)) for p in position)):
                raise ValueError(f"Invalid position for galaxy '{galaxy['name']}': Must be a list of 3 numbers.")
            if not (isinstance(velocity, list) and len(velocity) == 3 and all(isinstance(v, (int, float)) for v in velocity)):
                raise ValueError(f"Invalid velocity for galaxy '{galaxy['name']}': Must be a list of 3 numbers.")

            mass = galaxy["mass"]
            radius = galaxy["radius"]
            gas = galaxy["gas"]
            if not (isinstance(mass, (int, float)) and mass > 0):
                raise ValueError(f"Invalid mass for galaxy '{galaxy['name']}': Must be a positive number.")
            if not (isinstance(radius, (int, float)) and radius > 0):
                raise ValueError(f"Invalid radius for galaxy '{galaxy['name']}': Must be a positive number.")

            processed_params.append({
                "name": galaxy["name"],
                "position": position,
                "velocity": velocity,
                "mass": mass,
                "radius": radius,
                "gas": gas,
                "type": galaxy["type"]
            })

        print("Received galaxy parameters:", processed_params)
        sim_params = {"num_galaxies": len(processed_params), "galaxies": processed_params}
        return sim_params

    except Exception as e:
        raise ValueError(f"Invalid parameters: {str(e)}")